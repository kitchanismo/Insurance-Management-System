import { useState, useEffect, useContext } from 'react'
import MyGraph, { DataProps } from 'components/common/MyGraph'
import Branch from 'models/branch'
import { GlobalContext } from 'providers/GlobalProvider'

interface StatisticsProps {
  range: { start: string; end: string }
  statistics: DataProps[]
}

export interface StatisticGraphProps {
  branches: Branch[]
  title: string
  getData: (range: string, branchId?: number) => Promise<any>
}

const StatisticGraph: React.SFC<StatisticGraphProps> = ({
  branches,
  getData,
  title,
}) => {
  const [state, _] = useContext(GlobalContext)!
  const [data, setData] = useState<StatisticsProps>({
    range: { start: '', end: '' },
    statistics: [],
  })

  const [branchId, setBranchId] = useState('')

  const [range, setRange] = useState('')

  useEffect(() => {
    if (state?.currentUser?.role === 'admin') {
      getData(range, +branchId).then((data) => {
        setData((prevData) => ({
          ...prevData,
          ...data,
        }))
      })
    }
  }, [range, branchId])

  const handleSelectedBranchClient = (branchId: string) => {
    setBranchId(branchId)
  }

  const handleSelectedRange = (range: string) => {
    setRange(range)
  }

  return (
    <MyGraph
      onSelectedRange={handleSelectedRange}
      onSelectedBranch={handleSelectedBranchClient}
      title={title}
      range={data?.range!}
      data={data?.statistics!}
      branches={branches}
    />
  )
}

export default StatisticGraph
