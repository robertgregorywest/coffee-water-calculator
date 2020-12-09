import PropTypes from "prop-types";
import TextInput from "./TextInput";

function EntryForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="calcium"
        label="Calcium"
        name="calcium"
        onChange={props.onChange}
        value={props.waterData.calcium}
        error={props.errors.calcium}
      />

      <TextInput
        id="magnesium"
        label="Magnesium"
        name="magnesium"
        className="form-control"
        onChange={props.onChange}
        value={props.waterData.magnesium}
        error={props.errors.magnesium}
      />

      <TextInput
        id="bicarbonate"
        label="Bicarbonate"
        name="bicarbonate"
        className="form-control"
        onChange={props.onChange}
        value={props.waterData.bicarbonate}
        error={props.errors.bicarbonate}
      />

      <TextInput
        id="tds"
        label="TDS"
        name="tds"
        onChange={props.onChange}
        value={props.waterData.tds}
        error={props.errors.tds}
      />

      <TextInput
        id="temp"
        label="Temperature"
        name="temp"
        onChange={props.onChange}
        value={props.waterData.temp}
        error={props.errors.temp}
      />

      <input type="submit" value="Calculate" className="btn btn-primary" />
    </form>
  );
}

EntryForm.propTypes = {
  waterData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default EntryForm;
