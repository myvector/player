import React from 'react';
import withStore from '~/hocs/withStore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './index.module.css';
import type from './index.css';

function Notifications(props) {
  const messages = props.stores.notifications.fromListNotifications.map(
    (el) => {
      return (
        <CSSTransition
          key={el.id}
          classNames={{
            enter: styles.itemEnter,
            enterActive: styles.itemEnterActive,
            exitActive: styles.itemLeaveActive,
          }}
          timeout={500}
        >
          <div
            className={styles.item + ' ' + el.type}
            onClick={() => {
              props.stores.notifications.removeMessage(el.id);
            }}
          >
            {el.message}
          </div>
        </CSSTransition>
      );
    }
  );

  return <TransitionGroup className={styles.box}>{messages}</TransitionGroup>;
}

export default withStore(Notifications);
