import './_table.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { generateTableHead, makeTableRow } from '../../helpers';
import { API_HOST } from '../../../../../services/request';

const ExportTable = ({ items, access }) => (
  <Table className="exportTable">
    <thead>
      <tr>
        {generateTableHead(access?.export_download).map((el, index) => (
          <th className={index === 0 ? 'p-l' : ''} key={index}>
            {el}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {items.map((item, index) => (
        <tr key={index}>
          {makeTableRow(item).map((el, index) => {
            const link = `${API_HOST}/users/export-download/${el}`;

            if (index === 4) {
              if (!access?.export_download) {
                return null;
              }

              return (
                <td className="exportDownloadButton p-r" key={index}>
                  {item.ready ? (
                    <Button href={link} bsSize="xs">
                      Download
                    </Button>
                  ) : (
                    <span>{item.export_status_name}</span>
                  )}
                </td>
              );
            }

            return (
              <td className={index === 0 ? 'p-l' : ''} key={index}>
                {el}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </Table>
);

ExportTable.propTypes = {
  items: PropTypes.array,
  access: PropTypes.object,
};

export default ExportTable;
