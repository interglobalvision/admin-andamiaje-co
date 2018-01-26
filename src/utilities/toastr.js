export const ToastrOptionsError = {
  timeOut: 0,
  removeOnHover: false
};

export const ToastrOptionsSuccess = {
  showCloseButton: false
};

export const ToastrOptionsConfirm = (onOkFunc, arg) => {
  return {
    onOk: () => onOkFunc(arg),
    onCancel: null,
    okText: 'Confirmar',
    cancelText: 'Cancelar'
  };
};
