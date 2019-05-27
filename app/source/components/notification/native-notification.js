import notificationTypes from './notification-types';

const spawnNativeNotification = notification => {
  let { user, meta, repository, type } = notification;
  let notificationType = notificationTypes[type];

  let title = 'Creuna Dashboard';

  let repositoryText = repository.branch
    ? `${repository.name}/${repository.branch}`
    : repository.name;

  let description =
    notification.type === 'push'
      ? notificationType.description(meta)
      : notificationType.description;

  let issueNumber = meta.number ? `#${meta.number}` : '';
  let issueTitle = meta.title ? meta.title : '';

  let body = `${user.name} ${description} ${issueNumber} ${issueTitle} ${
    notification.type === 'push' ? '' : 'in '
  }${repositoryText}`;

  let options = {
    body: body,
    icon: user.avatar
  };

  new Notification(title, options).onclick = () => window.open(repository.url);
};

export default spawnNativeNotification;
