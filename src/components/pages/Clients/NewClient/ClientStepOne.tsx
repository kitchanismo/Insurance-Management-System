import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import MyForm, { MyFormProps } from "components/common/MyForm";
import Profile from "models/profile";
import validator from "validators/saveProfileValidator";
import { GlobalContext } from "providers/GlobalProvider";

export interface ClientStepOneProps {
  state: [Profile, React.Dispatch<React.SetStateAction<Profile>>];
  onNext: (profile: Profile) => Promise<void>;
}

export const ClientStepOne: React.SFC<ClientStepOneProps> = ({
  state: [profile, setProfile],
  onNext,
}) => {
  const [{ currentUser }, _] = useContext(GlobalContext)!;

  const history = useHistory();

  const [imageFile, setImageFile] = React.useState<HTMLImageElement | null>(
    null
  );

  const formProps: MyFormProps<Profile> = {
    state: [profile, setProfile],
    onSubmit: onNext,
    validator,
  };

  return (
    <MyForm {...formProps}>
      {({ myInput, mySelect, myDateTimePicker, myButton }) => (
        <>
          {myInput({
            label: "Firstname",
            value: profile.firstname,
            name: "firstname",
          })}
          {myInput({
            label: "Middlename",
            value: profile.middlename,
            name: "middlename",
          })}
          {myInput({
            label: "Lastname",
            value: profile.lastname,
            name: "lastname",
          })}
          {myInput({
            label: "Contact Number",
            value: profile.contact,
            name: "contact",
          })}

          {myInput({
            label: "Address",
            value: profile.address,
            name: "address",
            isMultiline: true,
          })}

          {myDateTimePicker({
            label: "Birthdate",
            value: profile.birthdate,
            name: "birthdate",
          })}

          {mySelect({
            label: "Gender",
            value: profile.gender,
            name: "gender",
            options: [
              { value: "Male" },
              { value: "Female" },
              { value: "Other" },
            ],
          })}

          {mySelect({
            label: "Civil Status",
            value: profile.civil,
            name: "civil",
            labelWidth: 80,
            options: [
              { value: "Single" },
              { value: "Married" },
              { value: "Widowed" },
            ],
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
              {myButton("NEXT")}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  );
};

export default ClientStepOne;
