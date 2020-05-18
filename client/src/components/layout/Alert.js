import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Message } from 'rsuite';


const Alert = ({alerts}) => 
    alerts !== null && alerts.length >0 && alerts.map(alert => (
    <div key={alert.id}>
           <Message showIcon type={alert.alertType} description={alert.msg} />
    </div>
    ));


Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}
const mapStateToProps = state =>({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
