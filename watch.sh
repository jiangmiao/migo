watch.rb -d '(lib|examples)'  -f 'toffee$' -e '
cd lib 
toffee -c migo.toffee 
cd .. 
toffee examples/simple.toffee 0 
echo '----------------------------'
toffee examples/simple.toffee
'
