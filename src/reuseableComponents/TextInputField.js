import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

export default function BasicTextFields({
  value,
  maxLength,
  onChangeFun,
  type,
  placeholder,
}) {
  return (
    <FormControl fullWidth>
      <TextField
        id="outlined-basic"
        value={value}
        inputProps={{ maxLength: maxLength, type: type }}
        onChange={(e) => {
          onChangeFun(e);
        }}
        variant="outlined"
        size="small"
        placeholder={placeholder}
      />
    </FormControl>
  );
}
