
aws s3 sync  \
  /Users/robcmills/src/staex-react/staex/build  \
  s3://robcmills.net/square-stacks  \
  --exclude '*.DS_Store'
  # --dryrun
