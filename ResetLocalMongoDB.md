## Run the Project Locally:

For some reason, the MongoDB Server got disconnected and I had to restart it. This led to me losing all the items and users I had created locally.

Restart the MongoDB:

- Ctrl + C Clear both of the Servers
- Make sure MongoDB is actually running. If no result, there is no listener
  - netstat -ano | findstr :27017
- Is the Windows service installed?
  - sc query MongoDB
- If present but stopped:
  - net start MongoDB
- Re-install MongoDB again as a Windows service:
  - winget install --id MongoDB.Server -e
- Start MongoDB:
  - net start MongoDB
- Verify/Test that MongoDB is running:
  - Test-NetConnection 127.0.0.1 -Port 27017
- Run both of the Projects:
  - npm run dev
