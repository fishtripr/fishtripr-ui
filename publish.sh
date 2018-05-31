#!/usr/bin/env bash

  # Get the name of the current Git branch and then ensure that only
  # the master Git branch is deployable to NPM by this script.
  branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

  # Only push this update to the NPM if the current branch is the master branch
  if [ "$branch" == "master" ]
  then
    echo "Deploying the $branch branch to NPM..."

    yarn build-bundle && npm publish --access public

    echo "Finished deploying to NPM."
  else
    echo "Will not publish from a branch other than master to NPM. Check out master to deploy to NPM"
  fi

