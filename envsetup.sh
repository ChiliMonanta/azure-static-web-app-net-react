export CWD_PATH=`pwd`

alias infra-build='(cd $CWD_PATH/infrastructure && az bicep build --file main.bicep --stdout)'
alias infra-apply='ls -l'
alias deploy=``