import React from 'react';
import PropTypes from 'prop-types';

import buildStatuses from '../build-status/build-statuses';

import BuildStatus from '../build-status';
import Card from '../card';
import Graph from '../graph';
import Link from '../link';
import Package from '../package';

const pluralizeLabel = (count, text) => (count === 1 ? text : text.concat('s'));

const Project = ({ activity, build, issues, name, npm, url }) => {
  const buildStatus = build ? buildStatuses(build.state) : {};
  const showLines = Boolean(build || npm);

  return (
    <Card theme={buildStatus.theme}>
      <div className="project">
        <h3>
          <Link url={url}>{name}</Link>
        </h3>
        {issues ? (
          <p className="project-issues">
            <b>{issues}</b> {pluralizeLabel(issues, 'open issue')}
          </p>
        ) : (
          <p className="project-issues">No open issues! ✨</p>
        )}
        {showLines && <hr />}
        {build && (
          <div className="project-build">
            <BuildStatus {...build} />
          </div>
        )}
        {npm && (
          <div className="project-package">
            <Package {...npm} />
          </div>
        )}
        {showLines && <hr />}
        {activity && (
          <div className="project-activity">
            <Graph data={activity} theme={buildStatus.graphTheme} />
          </div>
        )}
      </div>
    </Card>
  );
};

Project.propTypes = {
  activity: PropTypes.object,
  build: PropTypes.shape({
    branch: PropTypes.string,
    state: PropTypes.string,
    statusMessage: PropTypes.string
  }),
  issues: PropTypes.number,
  name: PropTypes.string,
  npm: PropTypes.object,
  url: PropTypes.string
};

export default Project;
