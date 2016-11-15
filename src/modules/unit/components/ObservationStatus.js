import React from 'react';
import {translate} from 'react-i18next';
import moment from 'moment';
import Time from '../../home/components/Time';
import {getAttr} from '../helpers';


export const ObservationStatus = translate()(({observation, t}) => {
  const quality = observation && observation.quality || 'unknown';
  const observationTime = moment(observation && observation.time || 0).toDate();
  const observationName = observation && getAttr(observation.name) || t('UNIT.UNKNOWN');

  return (
    <div className="observation-status">
      <div className={`observation-status__bar--${quality}`}>
        {observationName}
      </div>
      <div className="observation-status__time">
        {t('UNIT.UPDATED')} <Time time={observationTime}/>
      </div>
    </div>);
});


export default ObservationStatus;