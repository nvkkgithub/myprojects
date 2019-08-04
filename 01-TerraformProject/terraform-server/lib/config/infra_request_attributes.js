 const all_infra_attributes = [
    {
        attribute_label : 'Cloud',
        attribute_type : 'provider',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'Region',
        attribute_type : 'region',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'Server Tag',
        attribute_type : 'server_tag',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'Server Stack',
        attribute_type : 'server',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'Server AMI',
        attribute_type : 'serverAMI',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'Server IP range',
        attribute_type : 'cidr_ips',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'VPC',
        attribute_type : 'vpc',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'Subnet',
        attribute_type : 'subnet',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'Subnet Zone',
        attribute_type : 'subnet_zone',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'Opened Ports',
        attribute_type : 'applnPortRangeTo',
        prev_value : 'n/a',
        cur_value : 'n/a'
    }
];

const all_software_attributes = [
    {
        attribute_label : 'NodeJs',
        attribute_type : 'nodeJsVersion',
        prev_value : 'n/a',
        cur_value : 'n/a'
    },
    {
        attribute_label : 'Java',
        attribute_type : 'javaVersion',
        prev_value : 'n/a',
        cur_value : 'n/a'
    }
];

module.exports = {
    all_infra_attributes,
    all_software_attributes
}