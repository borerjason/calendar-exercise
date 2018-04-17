import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {EVENT_PROP_TYPE} from './constants';

import './TimeSlotEvent.css';

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onSelect: PropTypes.func.isRequired,
       
    }

    render() {
        let {
            event: {title, color, start},
            onSelect,
        } = this.props;
        
        const passed = start < new Date() ? 'time-slot-event-passed' : '';

        return (
            <button className={`time-slot-event time-slot-event--${color} ${passed}`} onClick={onSelect}>
                {title}
            </button>
        );
    }
}
