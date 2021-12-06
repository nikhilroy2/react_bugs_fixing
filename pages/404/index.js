import React, { useEffect } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Alert from '../../components/Alert';

const NotFoundPage = ({ errorDataMessage, errorStatus, errorStatusText }) => {
  useEffect(() => {
    document.title = `${errorStatusText} (#${errorStatus})`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid>
      <Row>
        <Col lg={8}>
          <h1>{`${errorStatusText} (#${errorStatus})`}</h1>
          {errorDataMessage && <Alert text={typeof errorDataMessage === 'string' ? errorDataMessage : errorDataMessage.error_message} />}
          <p>The above error occurred while the Web server was processing your request.</p>
          <p>Please contact us if you think this is a server error. Thank you.</p>
        </Col>
      </Row>
    </Grid>
  );
};

NotFoundPage.propTypes = {
  errorDataMessage: PropTypes.object,
  errorStatus: PropTypes.number,
  errorStatusText: PropTypes.string,
};

NotFoundPage.defaultProps = {
  errorDataMessage: null,
  errorStatus: 404,
  errorStatusText: 'Not Found',
};

export default NotFoundPage;
