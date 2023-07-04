import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
    pseudo: yup.string().required('Le pseudo est requis'),
    email: yup.string().email("L'adresse email n'est pas au bon format").required("L'adresse email est requise"),
    phone: yup
        .string()
        .matches(phoneRegExp, {
            message: "Le numéro de téléphone n'est pas valide",
            excludeEmptyString: true,
        })
        .nullable(),
    linkWebsite: yup.string().url("L'adresse URL n'est pas valide"),
    linkYoutube: yup.string().url("L'adresse URL n'est pas valide"),
    linkInstagram: yup.string().url("L'adresse URL n'est pas valide"),
    linkLinkedin: yup.string().url("L'adresse URL n'est pas valide"),
    linkTwitter: yup.string().url("L'adresse URL n'est pas valide"),
});

export default schema;