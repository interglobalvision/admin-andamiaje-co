export const CloudFunctionsUrl = 'https://us-central1-igv-andamiaje-co.cloudfunctions.net';

export const ToastrOptionsError = {
  timeOut: 0,
  removeOnHover: false
};

export const ToastrOptionsSuccess = {
  showCloseButton: false
};

export const ToastrConfirmOptions = (onOkFunc, arg) => {
  return {
    onOk: () => onOkFunc(arg),
    onCancel: null,
    okText: 'Confirmar',
    cancelText: 'Cancelar'
  };
};
