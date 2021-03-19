import React, { useContext, useEffect, useState }  from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import * as Yup from "yup";

import { LeadsContext } from '../contexts/leads';
import Button from '../components/button'
import Card from '../components/card'
import H1 from '../components/h1'
import { LinkButtonSecondary } from '../components/link-button'
import { CustomFormikField, CustomInputMask } from '../components/custom-fields'
import CustomErrorMessage from '../components/custom-error-message'
import { AlignRight, Col, Row } from '../components/grid'

interface IParams {
  id?: string;
};

export default function AddEdit() {
  const history = useHistory();
  
  const { id } = useParams<IParams>();
  const isAddMode = !id;
  const idN: number = parseInt(id ?? '0');
  
  const { fetchLeads, getById, addLead, updateLead, tiposEstadoCivil } = useContext(LeadsContext);
  const [lead, setLead] = useState<ILead | null>(null);
  const [married, setMarried] = useState<boolean>(false);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);
  
  useEffect(() => {
    if (!isAddMode) {
      var newLead = getById(idN);
      setLead(newLead);
      isMarried(newLead?.estadoCivil ?? '');
    }
  }, [getById, idN, isAddMode]);

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .required('O nome é obrigatório'),
    email: Yup.string()
      .email('Informe um e-mail válido')
      .required('Informe um e-mail'),
    cpf: Yup.string()
      .required('Informe o CPF'),
    estadoCivil: Yup.string()
      .required('Selecionar o estado civil'),
    nomeConjuge: Yup.string()
      .when('estadoCivil', (_estadoCivil: string, schema: any) => {
        if (married) return schema.required('Nome do cônjuge deve ser informado');
      })
  });

  function onSubmit(lead: ILead) {
    if (isAddMode) {
      createLead(lead);
    } else {
      saveLead(idN, lead);
    }
  }

  function createLead(lead: ILead) {
    addLead(lead);
    history.push('.');
  }

  function saveLead(id: number, lead: ILead) {
    updateLead(id, lead);
    history.push('..');
  }
 
  function isMarried(estadoCivil: string): boolean {
    var ret  = estadoCivil === 'Casado(a)';
    setMarried(ret);
    return ret;
  }

  return (
    <div>
      <H1>{isAddMode ? 'Novo lead' : 'Edição de lead'}</H1>
      <Card>
        <Formik 
          enableReinitialize={true}
          initialValues={{
            id: lead?.id ?? 0,
            nome: lead?.nome ?? '',
            email: lead?.email ?? '',
            cpf: lead?.cpf ?? '',
            estadoCivil: lead?.estadoCivil ?? '',
            nomeConjuge: lead?.nomeConjuge ?? '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
            } = props;

            const myHandleChange = (e: any) => {
              const selectedestadoCivil = e.target.value;
              handleChange(e);          
              if(!isMarried(selectedestadoCivil)) {
                values.nomeConjuge = '';
              }          
            };

            return (
              <Form autoComplete="off">
                <Row>
                  <Col>
                    <label>Nome</label>
                    <CustomFormikField name="nome" type="text" className={(errors.nome && touched.nome ? ' is-invalid' : '')} />
                    <CustomErrorMessage name="nome" component="div" />
                  </Col>
                  <Col>
                    <label>E-mail</label>
                    <CustomFormikField name="email" type="text" className={(errors.email && touched.email ? ' is-invalid' : '')} />
                    <CustomErrorMessage name="email" component="div" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>CPF</label>
                    <CustomFormikField
                      name="cpf"
                      className={(errors.cpf && touched.cpf ? ' is-invalid' : '')}
                    >
                      {
                        ({ field }: any) => 
                          <CustomInputMask
                            {...field}
                            mask="999.999.999-99"
                            id="phone"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}                            
                          />
                      }
                    </CustomFormikField>

                    <CustomErrorMessage name="cpf" component="div" />
                  </Col>
                  <Col>
                      <label>Estado civil</label>
                      <Field name="estadoCivil" as="select" className={(errors.estadoCivil && touched.estadoCivil ? ' is-invalid' : '')} onChange={myHandleChange}>
                          <option key="empty" value=""></option>
                          {tiposEstadoCivil.map((tec, key) => (
                            <option key={`tec-${key}`} value={tec.nomeEstadoCivil}>{tec.nomeEstadoCivil}</option>
                          ))}
                      </Field>
                      <CustomErrorMessage name="estadoCivil" component="div" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Nome do cônjuge</label>
                    <CustomFormikField name="nomeConjuge" type="text" disabled={!married} className={(errors.nomeConjuge && touched.nomeConjuge ? ' is-invalid' : '')} />
                    <CustomErrorMessage name="nomeConjuge" component="div" />
                  </Col>
                </Row>
                <AlignRight>
                    <LinkButtonSecondary to={isAddMode ? '.' : '..'} className="btn btn-link">Cancelar</LinkButtonSecondary>
                    { ' ' }
                    <Button type="submit" disabled={isSubmitting}>
                      Gravar
                    </Button>
                </AlignRight>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
}
