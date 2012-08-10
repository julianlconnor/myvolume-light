server "23.21.68.153", :web
set :user, "ubuntu"
set :repo, "git@github.com:muffs/myvolume-light.git"

default_run_options[:pty] = true


task :hello do
  puts "Hello"
  run "echo 'Hello' > ~/hello.txt"
end


task :goodbye do
  puts "Bye"
end

after :hello, :goodbye
