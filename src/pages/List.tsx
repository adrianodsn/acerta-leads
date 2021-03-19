import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Formik, Form } from 'formik';

import { LeadsContext } from '../contexts/leads';
import { stringToSearch } from '../helpers/strings'
import Button from '../components/button'
import Card from '../components/card'
import H1 from '../components/h1'
import { LinkButton } from '../components/link-button'
import { CustomFormikField, CustomInputMask } from '../components/custom-fields'
import { AlignLeft, AlignRight, Col, Row } from '../components/grid'
import TableWrapper from '../components/table-wrapper'

interface ISearchTerms {
  nome: string;
  cpf: string;
};

export default function List() {
  const { fetchLeads, leads, removeLead } = useContext(LeadsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [cpf, setCpf] = useState("");
 
  function onSubmit(searchTerms: ISearchTerms) {
    setSearchTerm(stringToSearch(searchTerms.nome));
    setCpf(searchTerms.cpf);
  }
  
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  function deleteLead(id: number): boolean {
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Excluir lead?'))
    {
      removeLead(id);
    }
    return false;
  };
  
  return (
    <div>
      <H1>Leads</H1>

      <Card>
        <Formik 
          initialValues={{
            nome: '',
            cpf: '',
          }}
          onSubmit={onSubmit}
        >
          {props => {
            const { handleBlur, handleChange } = props;
            return (
              <Form autoComplete="off">
                <Row>
                  <Col>
                    <label>Nome</label>
                    <CustomFormikField name="nome" type="text" />
                  </Col>
                  <Col>
                    <label>CPF</label>
                    <CustomFormikField
                      name="cpf"
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
                  </Col>
                </Row>
                <AlignRight>
                  <Button type="submit">
                    Filtrar
                  </Button>
                </AlignRight>
              </Form>
            );
          }}
        </Formik>
      </Card>

      <AlignLeft>
        <LinkButton to="/add">Novo lead</LinkButton>
      </AlignLeft>
      
      <TableWrapper>
        <table>
          <thead>
            <tr className="lg">
              <th></th>
              <th>E-mail</th>
              <th>Nome</th>
              <th>CPF</th>
            </tr>
          </thead>
          <tbody>
            {leads.filter(lead => (stringToSearch(lead.nome).includes(searchTerm) || searchTerm === '') && (lead.cpf === cpf || cpf === ''))
              .map((lead, key) => (
                <tr key={key}>
                  <td>
                    <Link to={`/edit/${lead.id}`}><FaEdit /></Link>
                    { ' ' }
                    <Link to="/" onClick={() => deleteLead(lead.id)}><FaRegTrashAlt /></Link>
                  </td>
                  <td>
                    <b>{lead.email}</b>
                    <div className="sm">
                      <div>{lead.nome}</div>
                      <div>{lead.cpf}</div>
                    </div>
                  </td>
                  <td className="lg">
                    {lead.nome}
                  </td>
                  <td className="lg">
                    {lead.cpf}
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>

    </div>
  );
};
