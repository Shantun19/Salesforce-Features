Add folder to the Git Repository 

cd path/to/Nav
git init
git remote add origin https://github.com/your-username/your-repo.git

if already added 
git remote set-url origin https://github.com/your-username/your-repo.git

git add .
git commit -m "Initial commit - added Salesforce project"
git push -u origin main
