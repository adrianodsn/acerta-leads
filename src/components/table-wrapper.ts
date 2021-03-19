import styled from "styled-components";

const TableWrapper = styled.div`

  tbody, td, tfoot, th, thead, tr {
      border-color: inherit;
      border-style: solid;
      border-width: 0;
  }

  table {
    width: 100%;
    vertical-align: top;
    border-color: #dee2e6;
    border-collapse: collapse;
    font-size: 0.8em;
    margin-top: 1rem;

    thead {
      vertical-align: bottom;
    }
    
     th {
      color: ${({ theme }) => theme.colors.white};
      display: table-cell;
      font-weight: bold;
      padding: 5px 10px;
      text-align: left;
      vertical-align: inherit;
    }

    td {
      background-color: ${({ theme }) => theme.colors.white};;
      border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};;
      padding: 5px 10px;
    }

    tbody {
      vertical-align: inherit;

      tr:first-child {
        td {
          padding-top: 12px;

          &:first-child {
            border-top-left-radius: 0.25rem;
          }

          &:last-child {
            border-top-right-radius: 0.25rem;
          }
        }
      }

      tr:last-child {
        td {
          border-bottom: 0;
          padding-bottom: 12px;

          &:first-child {
            border-bottom-left-radius: 0.25rem;
          }

          &:last-child {
            border-bottom-right-radius: 0.25rem;
          }
        }
      }
    }

    a {
      color: ${({ theme }) => theme.colors.blue};;
      font-size: 1.3em;

      &:focus,
      &:hover {
        color: ${({ theme }) => theme.colors.yellow};;
      }
    }
  }

  @media(max-width: 575px) {
    .lg {
      display: none;
    }
  }

  @media(min-width: 576px) {
    .sm {
      display: none;
    }
  }
`;

export default TableWrapper;