import { FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputText from './InputText';
import InputSelect from './InputSelect';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import InputFile from './InputFile';
import { submitted } from '../store/userFormSlice';
import userSchema from '../shcema/user';
import { ValidationError } from 'yup';
const FormUncontrolled = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);

  const fileToBase64 = async (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(form.current || undefined);
    const data = Object.fromEntries(formData.entries());
    try {
      const validationData = await userSchema.validate(data, {
        abortEarly: false,
      });

      if (validationData) {
        const file = await fileToBase64(validationData.file as File);
        console.log('file', file);
        dispatch(submitted({ ...validationData, file }));
      }
    } catch (exeption) {
      if (exeption instanceof ValidationError) {
        const exeptions: { [key: string]: string } = {};
        exeption.inner.forEach((exep) => {
          exeptions[exep.path as string] = exep.message;
        });
        console.log(exeption);
      }
    }

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
          name="confirmPassword"
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
          <label htmlFor="termsAndConditions">
            I accept terms and conditions
          </label>
          <input
            name="termsAndConditions"
            id="termsAndConditions"
            type="checkbox"
            required
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <Link to="/">Return Home</Link>
    </>
  );
};

export default FormUncontrolled;
