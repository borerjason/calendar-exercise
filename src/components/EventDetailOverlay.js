import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
  constructor(props) {
    super(props)
    
    this._handleEscPress = this._handleEscPress.bind(this);
    this._handleWindowClick = this._handleWindowClick.bind(this);
  }
  
  static propTypes = {
      event: EVENT_PROP_TYPE.isRequired,
      onClose: PropTypes.func.isRequired
  }

    componentDidMount() {
      document.addEventListener('keydown', this._handleEscPress);
      document.addEventListener('click', this._handleWindowClick);
      document.body.style.overflow = 'hidden';
    }
    
    componentWillUnmount() {
      document.removeEventListener('keydown', this._handleEscPress);
      document.removeEventListener('click', this._handleWindowClick);
      document.body.style.overflow = 'auto';
    }

    _handleEscPress(e) {
      if (e.keyCode === 27) {
        this.props.onClose();
      }
    }

    _handleWindowClick(e) {
      if (!e.target.classList.toString().includes('event-detail-overlay')) {
        this.props.onClose()
      }
    } 

    render() {
        let {event, onClose} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();

        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;

        let startHourDisplay = getDisplayHour(startHour);
        let endHourDisplay = getDisplayHour(endHour);

        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`;

        // TODO: Add appropriate ARIA tags to overlay/dialog. added aria-label

        return (
            <section className="event-detail-overlay">
                <div className="event-detail-overlay__container">
                    <button
                        className="event-detail-overlay__close"
                        title="Close detail view"
                        onClick={onClose}
                        aria-label="Close"
                    />
                    <div>
                        {displayDateTime}
                        <span
                            className={`event-detail-overlay__color event-detail-overlay__${color}`}
                            title={`Event label color: ${color}`}
                        />
                    </div>
                    <h1 className="event-detail-overlay__title">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
            </section>
        );
    }
}
