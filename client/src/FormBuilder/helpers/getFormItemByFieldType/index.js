import Input from '../../FormComponents/Input';
import Select from '../../FormComponents/Select';
import Textarea from '../../FormComponents/Textarea';
import Checkbox from '../../FormComponents/Checkbox';

// import './FormComponents/basicStyles.scss';

const kvArray = [
  ['input', Input],
  ['select', Select],
  ['textarea', Textarea],
  ['checkbox', Checkbox],
];

const formItemsMap = new Map(kvArray);

const getFormItemByFieldType = (fieldType) => formItemsMap.get(fieldType);

export default getFormItemByFieldType;
