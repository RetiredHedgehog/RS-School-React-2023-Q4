import { FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputText from './InputText';
import InputSelect from './InputSelect';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import InputFile from './InputFile';
import { submitted } from '../store/userFormSlice';

const FormUncontrolled = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(form.current || undefined);
    dispatch(submitted(Object.fromEntries(formData.entries())));
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
        <InputSelect name="gender" options={['male', 'female', 'other']}>
          Gender
        </InputSelect>
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
        <InputFile name="file" required>
          File
        </InputFile>
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
