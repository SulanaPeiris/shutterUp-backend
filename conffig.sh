#!/bin/bash

echo "🗓  Enter the fake commit date (YYYY-MM-DD):"
read COMMIT_DATE

# Validate date format
if ! [[ $COMMIT_DATE =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "❌ Invalid date format. Use YYYY-MM-DD."
  exit 1
fi

echo "🕒 Enter the fake commit time (HH:MM, 24-hour format):"
read COMMIT_TIME

# Validate time format
if ! [[ $COMMIT_TIME =~ ^[0-9]{2}:[0-9]{2}$ ]]; then
  echo "❌ Invalid time format. Use HH:MM (24-hour format)."
  exit 1
fi

echo "📝 Enter your commit message:"
read COMMIT_MSG

# Detect branch
CURRENT_BRANCH=$(git branch --show-current)
echo "🌿  Detected current branch: $CURRENT_BRANCH"
echo "✅ Press Enter to use it or type a different branch name:"
read CUSTOM_BRANCH
BRANCH=${CUSTOM_BRANCH:-$CURRENT_BRANCH}

# Stage all manually changed files
git add .

# Commit with backdated time using user-provided date and time
GIT_AUTHOR_DATE="$COMMIT_DATE $COMMIT_TIME:00" \
GIT_COMMITTER_DATE="$COMMIT_DATE $COMMIT_TIME:00" \
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo "📦 Pushing to origin/$BRANCH..."
git push origin $BRANCH

echo "✅ Fake commit pushed for $COMMIT_DATE at $COMMIT_TIME with your changes."