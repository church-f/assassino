
import ElderlyIcon from '@mui/icons-material/Elderly';
import PersonIcon from '@mui/icons-material/Person';
import BlindIcon from '@mui/icons-material/Blind';
import ChurchIcon from '@mui/icons-material/Church';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CrueltyFreeIcon from '@mui/icons-material/CrueltyFree';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import Face2Icon from '@mui/icons-material/Face2';
import Face4Icon from '@mui/icons-material/Face4';
import Knife from '../components/Images/knife.svg?react';
import pistola from '../components/Images/pistola.svg?react';
import lips from '../components/Images/lips.svg?react';
import {SvgIcon} from '@mui/material';

export default function AvatarIcon(props){
    const idAvatarMap = new Map([
        [0, <PersonIcon color={props.selected ? "primary" : "inherit"} {...props} />],
        [1, <SvgIcon component={Knife} color={props.selected ? "primary" : "inherit"} {...props} />],
        [2, <SvgIcon component={pistola} color={props.selected ? "primary" : "inherit"} {...props} />],
        [3, <SvgIcon component={lips} color={props.selected ? "primary" : "inherit"} {...props} inheritViewBox />],
        [4, <ChildCareIcon color={props.selected ? "primary" : "inherit"} {...props} />],
        [5, <CrueltyFreeIcon color={props.selected ? "primary" : "inherit"} {...props} />],
        [6, <DirectionsRunIcon color={props.selected ? "primary" : "inherit"} {...props} />],
        [7, <DownhillSkiingIcon color={props.selected ? "primary" : "inherit"} {...props} />], 
        [8, <Face2Icon color={props.selected ? "primary" : "inherit"} {...props} />],
        [9, <Face4Icon color={props.selected ? "primary" : "inherit"} {...props} />],
        [10, <ElderlyIcon color={props.selected ? "primary" : "inherit"} {...props} />],
        [11, <BlindIcon color={props.selected ? "primary" : "inherit"} {...props} />],
        [12, <ChurchIcon color={props.selected ? "primary" : "inherit"} {...props} />],
        // Add more mappings as needed
    ]);
    return idAvatarMap.get(props.id) || <PersonIcon color={props.selected ? "primary" : "inherit"} {...props} />;
}