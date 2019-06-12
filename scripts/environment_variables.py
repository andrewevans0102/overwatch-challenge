import sys

try:
  # index.js
  with open('functions/index.js', 'r') as file :
    filedata = file.read()

  filedata = filedata.replace('OC_slack1', sys.argv[1]) 
  filedata = filedata.replace('OC_slack2', sys.argv[2])

  with open('functions/index.js', 'w') as file:
    file.write(filedata)

except IOError:
    print('An error occured trying to read the file.')
    
except ValueError:
    print('Non-numeric data found in the file.')

except ImportError:
    print "NO module found"
    
except EOFError:
    print('Why did you do an EOF on me?')

except KeyboardInterrupt:
    print('You cancelled the operation.')

except:
    print('An error occured.')