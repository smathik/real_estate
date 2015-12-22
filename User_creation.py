import sys, paramiko

def multiple_user():
    
     #List of users
     user_path = raw_input("Enter the user path : ")
     try:
         user_list = [user.rstrip('\n') for user in open(user_path)]
     except:
         print 'Path doest not exists !'
         return

     #List of Servers
     server_path = raw_input("Enter the server path : ")
     try:
         server_list = [user.rstrip('\n') for user in open(server_path)]
     except:
         print 'Path doest not exists !'
         return

     #Mirror id
     mirror_id = raw_input("Enter the mirror id : ")
     if not mirror_id: return 

     for server in server_list:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(server)
        (stdin, stdout, stderr) = ssh.exec_command('uname')
        for os in stdout.readlines():
            if os == "Linux":     

                 #Creation of users in linux servers
                for users in user_list:
                    for server in server_list:
                        ssh = paramiko.SSHClient()
                        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
                        ssh.connect(server)
                        (stdin, stdout, stderr) = ssh.exec_command('getent passwd '+mirror_id)
                        for lines in stdout.readlines():
                            mirror_id_objects = lines.split(":")
                            if mirror_id_objects[1] == 'x':
                                (stdin, stdout, stderr) = ssh.exec_command('useradd -m -d /home/'+users+' -c '+mirror_id_objects[4]+' -u 1'+users[1:]+' -s '+mirror_id_objects[-1].strip()+' -g '+mirror_id_objects[3]+' '+users)
                                if stderr.readlines() == []:
                                    print "The %s has been successfully created in Linux Server %s"%(users,server)
                                else:
                                    print "Error : ",stderr.readlines()
                            else:
                                print "This %s is VAS Account"%(users)

            elif os == "SunOS":

                #Creation of users in SunOS Server
                for users in user_list:
                    for server in server_list:
                        ssh = paramiko.SSHClient()
                        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
                        ssh.connect(server)
                        (stdin, stdout, stderr) = ssh.exec_command('getent passwd '+mirror_id)
                        for lines in stdout.readlines():
                            mirror_id_objects = lines.split(":")
                            (stdin, stdout, stderr) = ssh.exec_command('useradd -m -d /local/home/'+users+' -c '+mirror_id_objects[4]+' -u 1'+users[1:]+' -s '+mirror_id_objects[-1].strip()+' -g '+mirror_id_objects[3]+' '+users)
                            if mirror_id_objects[1] == 'x':
                                (stdin, stdout, stderr) = ssh.exec_command('useradd -m -d /home/'+users+' -c '+mirror_id_objects[4]+' -u 1'+users[1:]+' -s '+mirror_id_objects[-1].strip()+' -g '+mirror_id_objects[3]+' '+users)
                                if stderr.readlines() == []:
                                    print "The %s has been successfully created in Linux Server %s"%(users,server)
                                else:
                                    print "Error : ",stderr.readlines()
                            else:
                                print "This %s is VAS Account"%(users)

            elif os == "AIX":

                #Creation of users in AIX Server
                for users in user_list:
                    for server in server_list:
                        ssh = paramiko.SSHClient()
                        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
                        ssh.connect(server)
                        (stdin, stdout, stderr) = ssh.exec_command('getent passwd '+mirror_id)
                        for lines in stdout.readlines():
                            mirror_id_objects = lines.split(":")
                            (stdin, stdout, stderr) = ssh.exec_command('useradd -m -d /home/'+users+' -c '+mirror_id_objects[4]+' -u 1'+users[1:]+' -s '+mirror_id_objects[-1].strip()+' -g '+mirror_id_objects[3]+' '+users)
                            if mirror_id_objects[1] == 'x':
                                (stdin, stdout, stderr) = ssh.exec_command('useradd -m -d /home/'+users+' -c '+mirror_id_objects[4]+' -u 1'+users[1:]+' -s '+mirror_id_objects[-1].strip()+' -g '+mirror_id_objects[3]+' '+users)
                                if stderr.readlines() == []:
                                    print "The %s has been successfully created in Linux Server %s"%(users,server)
                                else:
                                    print "Error : ",stderr.readlines()
                            else:
                                print "This %s is VAS Account"%(users)


                 


def single_user():

    users = raw_input("Enter the user id : ")
    server = raw_input("Enter the server : ")
    mirror_id = raw_input("Enter the mirror id : ")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(server)
    (stdin, stdout, stderr) = ssh.exec_command('getent passwd '+mirror_id)
    for lines in stdout.readlines():
        mirror_id_objects = lines.split(":")
        (stdin, stdout, stderr) = ssh.exec_command('useradd -m -d /home/'+users+' -c '+mirror_id_objects[4]+' -u 1'+users[1:]+' -s '+mirror_id_objects[-1].strip()+' -g '+mirror_id_objects[3]+' '+users)
        if stderr.readlines() == []:
            print "The %s has been successfully created in %s"%(users,server)
        else:
            print "Error : ",stderr.readlines() 

def passwd_reset():

    passwd = 'Symc@123'

     user_path = raw_input("Enter the user path : ")
     try:
         user_list = [user.rstrip('\n') for user in open(user_path)]
     except:
         print 'Path doest not exists !'
         return

     #List of Servers
     server_path = raw_input("Enter the server path : ")
     try:
         server_list = [user.rstrip('\n') for user in open(server_path)]
     except:
         print 'Path doest not exists !'
         return

   
    for users in user_list:
        for server in server_list:
            ssh = paramiko.SSHClient()
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh.connect(server)
            (stdin, stdout, stderr) = ssh.exec_command('passwd '+users)
            stdin.write(passwd)
            stdin.write(passwd)
            stdin.flush()
            output = stdout.read.splitlines()
            for lines in output:
                if lines == "changed":
                    print "changed successfully"
                    





if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == '--single':
            single_user()
        elif sys.argv[1] == '--multiple':
            multiple_user()
        elif sys.argv[1] == '--passwd':
            passwd_reset()
    else:
        print 'pass arguments --single or --multiple'
