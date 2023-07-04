import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required("Le titre est requis"),
    description: yup.string().required("Une description est requise"),
});

export default schema;