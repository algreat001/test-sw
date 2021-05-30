
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 5,

  },
  control: {
    width: '100%',
    marginTop: 10,
  }
});

const validationSchema = yup.object({
  username: yup
    .string('Имя пользователя')
    .required('Обязательное поле'),
  email: yup
    .string('e-mail')
    .email('Введите корректный e-mail')
    .required('Обязательное поле - email'),
  review: yup
    .string('Текст рецензии')
    .required('Обязательное поле'),
});

export default function FormReview(props) {

  const classes = useStyles();

  const formik = useFormik({
    initialValues: { email: '', username: '', review: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (props.onSave) props.onSave(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle id="scroll-dialog-title">Рецензия</DialogTitle>
      <DialogContent dividers={true}>
        <TextField
          className={classes.control}
          id="username"
          placeholder="Имя пользователя"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          className={classes.control}
          id="email"
          placeholder="e-mail"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={classes.control}
          id="review"
          placeholder="Текст рецензии"
          type="textarea"
          multiline
          rows={5}
          value={formik.values.review}
          onChange={formik.handleChange}
          error={formik.touched.review && Boolean(formik.errors.review)}
          helperText={formik.touched.review && formik.errors.review}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Отмена
                </Button>
        <Button type="submit" color="primary">
          Сохранить
                </Button>
      </DialogActions>
    </form>

  );

}
