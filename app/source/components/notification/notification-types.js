/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from 'react';

import Link from '../link';

const IssueLink = ({ number, title, url }) => (
  <b>
    <Link url={url}>{`#${number} ${title}`}</Link>
  </b>
);

const issueClose = {
  className: 'theme-issue-close',
  icon: 'issue-closed',
  text: meta => (
    <React.Fragment>
      closed issue <IssueLink {...meta} /> in
    </React.Fragment>
  )
};

const issueComment = {
  className: 'theme-issue-comment',
  icon: 'issue-comment',
  text: meta => (
    <React.Fragment>
      commented on issue <IssueLink {...meta} /> in
    </React.Fragment>
  )
};

const issueOpen = {
  className: 'theme-issue-open',
  icon: 'issue-opened',
  text: ({ number, title }) => (
    <React.Fragment>
      created issue <b>{`#${number} ${title}`}</b> in
    </React.Fragment>
  )
};

const prMerge = {
  className: 'theme-merge',
  icon: 'git-merge',
  text: ({ number, title }) => (
    <React.Fragment>
      merged pull request <b>{`#${number} ${title}`}</b> in
    </React.Fragment>
  )
};

const prOpen = {
  className: 'theme-pull-request',
  icon: 'git-pull-request',
  text: ({ number, title }) => (
    <React.Fragment>
      created pull request <b>{`#${number} ${title}`}</b> in
    </React.Fragment>
  )
};

const push = {
  className: 'theme-push',
  icon: 'git-commit',
  text: ({ size }) => (
    <React.Fragment>
      pushed ${size > 1 ? `${size} commits` : 'a commit'} to
    </React.Fragment>
  )
};

export default { issueClose, issueComment, issueOpen, prMerge, prOpen, push };
