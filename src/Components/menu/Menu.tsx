import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Delete, Edit} from "@mui/icons-material";
import style from './Menu.module.scss'


const ITEM_HEIGHT = 25;
type LogMenuType ={
    id:string
    changeEditMode:(id:string,editMode:boolean)=>void
    removeItem:(id:string)=>void
}

export function LongMenu({removeItem,changeEditMode,id}:LogMenuType) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >

                <MenuItem onClick={()=>{changeEditMode(id,true)}}>
                    <div className={style.menu_item}>
                        Rename
                        <Edit/>
                    </div>
                </MenuItem>
                <MenuItem  onClick={()=>{removeItem(id)}}>
                    <div className={style.menu_item}>
                        Delete
                        <Delete/>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}