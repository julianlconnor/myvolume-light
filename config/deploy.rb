server "23.21.68.153", :web
set :user, "ubuntu"

set :scm, :git
set :use_sudo, true

# Repo settings for deploy
set :repository, "git@github.com:muffs/myvolume-light.git"
set :branch, "master"
set :deploy_via, :remote_cache # only fetches latest changes

set :deploy_to, "/home/myvolume"

# Uses local keys for clone / deploy
ssh_options[:forward_agent] = true

# Will forward pw requests to me
default_run_options[:pty] = true


namespace :deploy do
  task :compile, :roles => :web do
    run "pwd && cd /home/myvolume/current && pwd && config/compile_myvolume.sh"
  end
end

#after :deploy, "deploy:compile"
