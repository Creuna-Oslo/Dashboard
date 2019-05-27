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
  description: 'closed issue',
  icon: 'issue-closed',
  text: meta => (
    <React.Fragment>
      {issueClose.description} <IssueLink {...meta} /> in
    </React.Fragment>
  )
};

const issueComment = {
  className: 'theme-issue-comment',
  description: 'commented on issue',
  icon: 'issue-comment',
  text: meta => (
    <React.Fragment>
      {issueComment.description} <IssueLink {...meta} /> in
    </React.Fragment>
  )
};

const issueOpen = {
  className: 'theme-issue-open',
  description: 'created issue',
  icon: 'issue-opened',
  text: meta => (
    <React.Fragment>
      {issueOpen.description} <IssueLink {...meta} /> in
    </React.Fragment>
  )
};

const PrLink = ({ number, title, url }) => (
  <b>
    <Link url={url}>{`#${number} ${title}`}</Link>
  </b>
);

const prMerge = {
  className: 'theme-merge',
  description: 'merged pull request',
  icon: 'git-merge',
  text: meta => (
    <React.Fragment>
      {prMerge.description} <PrLink {...meta} /> in
    </React.Fragment>
  )
};

const prOpen = {
  className: 'theme-pull-request',
  description: 'created pull request',
  icon: 'git-pull-request',
  text: meta => (
    <React.Fragment>
      {prOpen.description} <PrLink {...meta} /> in
    </React.Fragment>
  )
};

const push = {
  className: 'theme-push',
  description: ({ size }) => {
    let commits = size > 1 ? `${size} commits` : 'a commit';
    return `pushed ${commits} to`;
  },
  icon: 'git-commit',
  text: ({ size }) => <React.Fragment>{push.description(size)}</React.Fragment>
};

export default { issueClose, issueComment, issueOpen, prMerge, prOpen, push };
