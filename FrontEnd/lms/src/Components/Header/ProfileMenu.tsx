import { Menu, Button, Text,Avatar } from '@mantine/core';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';
const ProfileMenu = ()=> {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
       <div className='flex items-center gap-3 cursor-pointer'>
        <span className='font-medium text-lg text-neutral-900'>XYZ</span>
            <Avatar variant='filled' src="avatar.png" size={45} alt="it's me" />
       </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Profile</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
       

        <Menu.Divider />

        
        <Menu.Item color="red" leftSection={<IconTrash size={14} />}>Delete my account</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default ProfileMenu;