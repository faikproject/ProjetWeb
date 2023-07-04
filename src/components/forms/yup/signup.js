import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().required("L'adresse email n'est pas valide"),
    pseudo: yup.string().required('Un pseudo est requis'),
    password: yup.string().required('Un mot de passe est requis').min(12).required(),
    confirm: yup
    .string()
    .required("La confirmation du mot de passe est requise")
    .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe ne correspondent pas"
    ),
});

export default schema;