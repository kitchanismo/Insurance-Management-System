import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructions: {
      padding: 0,
      paddingBottom: 20,
      backgroundColor: theme.palette.background.default,
    },
  }),
)

export interface MyStepperProps {
  steps: string[]
  activeStep?: number
}

export const useStepper = (steps: string[]) => {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }
  return { steps, activeStep, handleNext, handleBack, handleReset }
}

const MyStepper: React.FC<MyStepperProps> = ({ steps, activeStep }) => {
  const classes = useStyles()

  return (
    <Stepper
      className={classes.instructions}
      activeStep={activeStep}
      alternativeLabel
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default MyStepper
