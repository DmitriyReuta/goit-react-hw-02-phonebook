import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.number().required('Phone number is required'),
});
export const ContactForm = ({ AddContact }) => {
    
    return (
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={validationSchema}
          onSubmit={AddContact}
        >
          <Form>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" />
              <Field type="text" name="number" placeholder="Phone Number" />
              <ErrorMessage name="number" />
              <button type="submit">Add Contact</button>
            </Form>

        </Formik>
    )
}