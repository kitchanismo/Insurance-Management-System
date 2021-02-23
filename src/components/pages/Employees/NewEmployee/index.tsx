import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Grid from "@material-ui/core/Grid";
import { GlobalContext } from "providers/GlobalProvider";
import validator from "../../../../validators/saveEmployeeValidator";
import MyForm, { MyFormProps, InputProps } from "components/common/MyForm";
import Employee from "models/employee";
import { saveEmployee } from "services/employeeService";
import { EmployeeContext } from "providers/EmployeeProvider";
import { postImage } from "services/imageService";
import { getBranches } from "services/branchService";
import { BranchContext } from "providers/BranchProvider";

export interface NewUserProps {}

const NewEmployee: React.SFC<NewUserProps> = () => {
  const [{ currentUser }, globalDispatch] = useContext(GlobalContext)!;

  const [employeeState, employeeDispatch] = useContext(EmployeeContext)!;

  const [branchState, branchDispatch] = useContext(BranchContext)!;

  const [imageFile, setImageFile] = React.useState<HTMLImageElement | null>(
    null
  );

  useEffect(() => {
    globalDispatch({ type: "SET_TITLE", payload: "Employee Registration" });

    getBranches().then((branches) =>
      branchDispatch({ type: "ON_LOAD_BRANCHES", payload: branches })
    );
  }, []);

  const history = useHistory();

  const [employee, setEmployee] = React.useState<Employee>({
    status: "deactive",
  });

  const onSubmit = async (employee: Employee) => {
    globalDispatch({ type: "SET_IS_LOADING", payload: true });

    return postImage(employee?.image!, (image_url: string) => {
      employee.image_url = image_url;
      delete employee.image;
      return saveEmployee(employee).then(() => {
        globalDispatch({
          type: "SET_ALERT",
          payload: { message: "Successfully added", type: "success" },
        });
        globalDispatch({ type: "SET_IS_LOADING", payload: false });
      });
    });
  };

  const formProps: MyFormProps<Employee> = {
    state: [employee, setEmployee],
    onSubmit,
    validator,
  };

  return (
    <MyForm {...formProps}>
      {({ myInput, mySelect, myDateTimePicker, myButton }) => (
        <>
          {myInput({
            label: "Firstname",
            value: employee.firstname,
            name: "firstname",
          })}
          {myInput({
            label: "Middlename",
            value: employee.middlename,
            name: "middlename",
          })}
          {myInput({
            label: "Lastname",
            value: employee.lastname,
            name: "lastname",
          })}
          {myInput({
            label: "Contact Number",
            value: employee.contact,
            name: "contact",
          })}

          {myInput({
            label: "Address",
            value: employee.address,
            name: "address",
            isMultiline: true,
          })}

          {myDateTimePicker({
            label: "Birthdate",
            value: employee.birthdate,
            name: "birthdate",
          })}

          {mySelect({
            label: "Gender",
            value: employee.gender,
            name: "gender",
            options: [
              { value: "Male" },
              { value: "Female" },
              { value: "Other" },
            ],
          })}
          {mySelect({
            label: "Civil Status",
            value: employee.civil,
            name: "civil",
            labelWidth: 80,
            options: [
              { value: "Single" },
              { value: "Married" },
              { value: "Widowed" },
            ],
          })}

          {mySelect({
            label: "Position",
            value: employee.position,
            name: "position",
            labelWidth: 55,
            options: employeeState.positions.map((position) => ({
              value: position.id,
              name: position.name,
            })),
          })}

          {mySelect({
            label: "Branch",
            value: employee.branch,
            name: "branch",
            labelWidth: 55,
            options: branchState.branches.map((branch) => ({
              value: branch.id,
              name: branch.name,
            })),
          })}

          <Grid
            container
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 10,
            }}
            alignItems="center"
            justify="space-between"
            xs={12}
          >
            <Typography variant="subtitle1">
              {imageFile?.name || "Select Photo"}
            </Typography>
            <>
              <input
                accept="image/*"
                style={{
                  display: "none",
                }}
                name="image"
                id="icon-button-file"
                type="file"
                onChange={(e: any) => {
                  setImageFile(e.target.files[0]);
                }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          </Grid>

          <Grid
            style={{ paddingLeft: 18, paddingTop: 10, paddingBottom: 5 }}
            container
            xs={12}
            justify="center"
            spacing={2}
          >
            <Grid item xs={6}>
              {currentUser?.role === "admin" && (
                <Button
                  onClick={() => history.goBack()}
                  fullWidth
                  variant="contained"
                  color="default"
                >
                  BACK
                </Button>
              )}
            </Grid>
            <Grid item xs={6}>
              {myButton()}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  );
};
export default NewEmployee;
