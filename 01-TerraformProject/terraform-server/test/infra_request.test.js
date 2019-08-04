const infrarequest = require('../lib/infra_request');

test('Create - Infra Request', () => {
    const reqinfo = {
        appName: 'CPG',
        appCI : 'S.A.CPG',
        description: 'Corporate Projects',
        orgAccount : 'ekdev',
        provider : 'aws',
        environment : 'dev',
        region : 'us-east-2',
        vpc : 'cpg-vpc-1',
        subnet : 'cpg-vpc-1-subnet-1',
        cidr_ips : '10.0.0.0/16',
        subnet_zone : 'us-east-2b',
        server_tag : 'cpg-dev',
        server : 't2.micro',
        serverAMI : 'ami-05c1fa8df71875112',
        amiKeyPair : 'vk-ubuntu-ec2pair',
        applnPortRangeFrom : 3000, 
        applnPortRangeTo : 3000,
        nodeJsSwCommand : 'sleep 1',
        jdkSwCommand : 'sudo apt-get install -y default-jre',
        javaVersion : '',
        nodeJsVersion : '',
        environments : ['dev', 'test']
    };

    infrarequest.createRequest(null, null, reqinfo);

});

test('Fetch - Infra Request', () => {
  
    let reviewObj = infrarequest.reviewRequest(null, null);

    console.log('Response = ', reviewObj);

});