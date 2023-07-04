import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email("L'adresse email n'est pas au bon format").required("L'adresse email est requise"),
    password: yup.string().required('Un mot de passe est requis'),
});

export default schema;