import commands

print "Welcome to the User creation in Servers! "

#Need to Access all the info related to that mirror id
mirror_id = raw_input('Enter the mirror id : ')
mirror_id_objects = bash_execute_command('df ' + mirror_id)

#Group id
group_id = raw_input('Enter the group_id : ')


def multiple_user():
	#List of Users 
	user_path = raw_input("Enter the Path : ")
	try:
	    user_list = [user.rstrip('\n') for user in open(user_path)]
	except:
	    print 'Path doest not exists !'
	#List of Servers
	server_path = raw_input("Enter the Path : ")
	try:
	    server_list = [user.rstrip('\n') for user in open(user_path)]
	except:
	    print 'Path doest not exists !'
    for users in user_list:
        if users:
            for servers in server_list:
                print users,servers
                bash_execute_command(cmd)


def single_user():
	server_list = raw_input("Enter the User")
	user_list = raw_input("Enter the User")
	bash_execute_command()


def bash_execute_command(cmd):
    (response, output) = commands.getstatusoutput(cmd)
    if response:    
        print 'Error message : ',output
    return output
	

if __name__ == "__main__":
	if sys.argv[1] == '--single':
		single_user()
	elif sys.argv[1] == '--multiple':
		multple_user()
	else:
		print 'pass arguments --single or --multiple'