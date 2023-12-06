import { FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import countries from '../countries.json';
import InputText from './InputText';
import Select from './Select';

const FormUncontrolled = () => {
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  console.log(form);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('form submitted');
    navigate('/');
  };

  return (
    <>
      <p>Form Uncontrolled</p>
      <form onSubmit={handleSubmit} ref={form}>
        <InputText name="name" labelText="Name" autoComplete="on" required />
        <InputText name="age" labelText="Age" autoComplete="off" required />
        <InputText name="email" labelText="Email" autoComplete="on" required />
        <InputText
          name="password"
          labelText="Password"
          autoComplete="off"
          required
        />
        <InputText
          name="passwordRepeat"
          labelText="Repeat Password"
          autoComplete="off"
          required
        />
        <Select name="gender" options={['male', 'female', 'other']}>
          Gender
        </Select>
        <InputText
          name="country"
          labelText="Country"
          list="country-choice"
          autoComplete="on"
          required
        >
          <datalist id="country-choice">
            {countries.map((country) => (
              <option value={country} key={country} />
            ))}
          </datalist>
        </InputText>
        <div>
          <label htmlFor="t&c">I accept terms and conditions</label>
          <input id="t&c" type="checkbox" required />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <Link to="/">Return Home</Link>
    </>
  );
};

export default FormUncontrolled;
