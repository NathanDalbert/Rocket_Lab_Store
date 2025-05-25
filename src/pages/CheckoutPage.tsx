import {
  Clock, CreditCard, FileText, MapPin, Package as PackageIcon,
  ShieldCheck, Smartphone, Truck, User,
} from 'lucide-react';
import React, { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

interface CheckoutForm {
  fullName: string; email: string; cpf: string; phone: string;
  cep: string; street: string; number: string; complement: string;
  neighborhood: string; city: string; state: string;
  cardNumber: string; cardName: string; cardExpiry: string; cardCvv: string;
}

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, children, ...props }) => (
  <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${className}`} {...props}>
    {children}
  </label>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}
const Input: React.FC<InputProps> = ({ className, hasError, ...props }) => (
  <input
    className={`block w-full px-3 py-2.5 bg-white dark:bg-gray-700/50 border ${
      hasError ? "border-red-500" : "border-gray-300 dark:border-gray-600"
    } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-gray-50 ${className}`}
    {...props}
  />
);

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const { showToast } = useToast(); 

  const { items: cartItems, itemCount: currentItemCount, total: currentTotal } = state;

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "", email: "", cpf: "", phone: "",
    cep: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "",
    cardNumber: "", cardName: "", cardExpiry: "", cardCvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [activePaymentMethod, setActivePaymentMethod] = useState<"credit" | "pix" | "boleto">("credit");

  useEffect(() => {
    if (currentItemCount === 0 && !loading) {
      showToast("Seu carrinho está vazio. Redirecionando...", "info");
      navigate('/cart');
    }
  }, [currentItemCount, navigate, loading]);

  if (currentItemCount === 0 && !loading) {
    return <div className="p-10 text-center text-gray-500 dark:text-gray-400">Redirecionando para o carrinho...</div>;
  }

  const updateForm = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutForm> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Nome completo é obrigatório";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email inválido";
    if (!form.cpf.trim()) newErrors.cpf = "CPF é obrigatório";
    if (!form.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    if (!form.cep.trim()) newErrors.cep = "CEP é obrigatório";
    if (!form.street.trim()) newErrors.street = "Rua é obrigatória";
    if (!form.number.trim()) newErrors.number = "Número é obrigatório";
    if (!form.neighborhood.trim()) newErrors.neighborhood = "Bairro é obrigatório";
    if (!form.city.trim()) newErrors.city = "Cidade é obrigatória";
    if (!form.state.trim()) newErrors.state = "Estado é obrigatório";

    if (activePaymentMethod === "credit") {
      if (!form.cardNumber.trim()) newErrors.cardNumber = "Número do cartão é obrigatório";
      if (!form.cardName.trim()) newErrors.cardName = "Nome no cartão é obrigatório";
      if (!form.cardExpiry.trim()) newErrors.cardExpiry = "Validade é obrigatória (MM/AA)";
      if (!form.cardCvv.trim()) newErrors.cardCvv = "CVV é obrigatório";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Por favor, corrija os erros no formulário.", "error"); 
      const firstErrorField = Object.keys(errors).find(key => errors[key as keyof CheckoutForm]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    setLoading(true);
    showToast("Processando seu pedido...", "info"); 

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      dispatch({ type: "CLEAR_CART" });
      
      showToast("Pedido realizado com sucesso!", "success"); 
      navigate('/'); 
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
      showToast("Houve um erro ao processar seu pedido. Tente novamente.", "error"); 
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentMethodContent = () => {
    if (activePaymentMethod === "credit") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="cardNumber">Número do Cartão *</Label>
              <Input id="cardNumber" value={form.cardNumber} onChange={(e) => updateForm("cardNumber", e.target.value)} placeholder="0000 0000 0000 0000" hasError={!!errors.cardNumber} />
              {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="cardName">Nome no Cartão *</Label>
              <Input id="cardName" value={form.cardName} onChange={(e) => updateForm("cardName", e.target.value)} placeholder="Nome como está no cartão" hasError={!!errors.cardName} />
              {errors.cardName && <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>}
            </div>
            <div>
              <Label htmlFor="cardExpiry">Validade (MM/AA) *</Label>
              <Input id="cardExpiry" value={form.cardExpiry} onChange={(e) => updateForm("cardExpiry", e.target.value)} placeholder="MM/AA" hasError={!!errors.cardExpiry} />
              {errors.cardExpiry && <p className="mt-1 text-xs text-red-500">{errors.cardExpiry}</p>}
            </div>
            <div>
              <Label htmlFor="cardCvv">CVV *</Label>
              <Input id="cardCvv" value={form.cardCvv} onChange={(e) => updateForm("cardCvv", e.target.value)} placeholder="123" hasError={!!errors.cardCvv} />
              {errors.cardCvv && <p className="mt-1 text-xs text-red-500">{errors.cardCvv}</p>}
            </div>
          </div>
          <div className="p-3 border border-blue-200 rounded-md bg-blue-50 dark:bg-blue-900/30 dark:border-blue-700/50">
            <p className="flex items-center text-xs text-blue-700 dark:text-blue-300">
              <ShieldCheck className="w-4 h-4 inline mr-1.5 flex-shrink-0" />
              Seus dados de pagamento são criptografados e seguros.
            </p>
          </div>
        </div>
      );
    }
    if (activePaymentMethod === "pix") {
      return (
        <div className="px-4 py-6 text-center border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/30 dark:border-green-700/50">
          <Smartphone className="w-12 h-12 mx-auto mb-3 text-green-600 dark:text-green-400" />
          <h3 className="mb-2 font-semibold text-green-800 text-md dark:text-green-200">Pagamento via PIX</h3>
          <p className="mb-3 text-sm text-green-700 dark:text-green-300">Após confirmar, o QR Code e o código PIX Copia e Cola serão exibidos.</p>
          <div className="text-xs text-green-600 dark:text-green-400 space-y-0.5">
            <p>✓ Aprovação em segundos</p> <p>✓ Transação segura</p>
          </div>
        </div>
      );
    }
    if (activePaymentMethod === "boleto") {
      return (
        <div className="px-4 py-6 text-center border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 dark:border-yellow-700/50">
          <FileText className="w-12 h-12 mx-auto mb-3 text-yellow-600 dark:text-yellow-400" />
          <h3 className="mb-2 font-semibold text-yellow-800 text-md dark:text-yellow-200">Boleto Bancário</h3>
          <p className="mb-3 text-sm text-yellow-700 dark:text-yellow-300">O boleto será gerado e poderá ser pago em qualquer banco ou lotérica.</p>
          <div className="text-xs text-yellow-600 dark:text-yellow-400 space-y-0.5">
             <p>✓ Vencimento em 3 dias úteis</p> <p>✓ Confirmação em até 48h</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const paymentMethodButtonStyle = (method: "credit" | "pix" | "boleto") =>
    `flex-1 py-3 px-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-orange-500 ${
      activePaymentMethod === method
        ? "bg-orange-500 text-white shadow-md"
        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
    }`;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-950">
      <div className="container px-4 py-8 mx-auto sm:py-12">
        {/* Header da Página */}
        <div className="p-4 mb-8 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800/30 dark:border-gray-700/30 sm:p-6">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div>
              <h1 className="flex items-center text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-50">
                <span className="hidden sm:block w-1.5 h-7 bg-orange-500 rounded mr-3"></span>
                Finalizar Compra
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:text-base">Complete suas informações para processar o pedido.</p>
            </div>
            <div className="flex items-center gap-2 p-2 mt-3 text-xs text-green-600 rounded-md sm:text-sm dark:text-green-400 sm:mt-0 bg-green-50 dark:bg-green-900/30">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Ambiente 100% Seguro</span>
            </div>
          </div>
        </div>

        <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-3">
          {}
          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
            {}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700/50">
                <h2 className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                  <User className="w-5 h-5 mr-3 text-orange-500" />
                  Informações Pessoais
                </h2>
              </div>
              <div className="grid grid-cols-1 p-6 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="fullName">Nome Completo *</Label>
                  <Input id="fullName" value={form.fullName} onChange={(e) => updateForm("fullName", e.target.value)} placeholder="Seu nome completo" hasError={!!errors.fullName} />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="seu.email@exemplo.com" hasError={!!errors.email} />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input id="cpf" value={form.cpf} onChange={(e) => updateForm("cpf", e.target.value)} placeholder="000.000.000-00" hasError={!!errors.cpf} />
                  {errors.cpf && <p className="mt-1 text-xs text-red-500">{errors.cpf}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Telefone / Celular *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="(00) 90000-0000" hasError={!!errors.phone} />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700/50">
                <h2 className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                  <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                  Endereço de Entrega
                </h2>
              </div>
              <div className="grid grid-cols-1 p-6 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <Input id="cep" value={form.cep} onChange={(e) => updateForm("cep", e.target.value)} placeholder="00000-000" hasError={!!errors.cep} />
                  {errors.cep && <p className="mt-1 text-xs text-red-500">{errors.cep}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="street">Rua / Avenida *</Label>
                  <Input id="street" value={form.street} onChange={(e) => updateForm("street", e.target.value)} placeholder="Nome da sua rua" hasError={!!errors.street} />
                  {errors.street && <p className="mt-1 text-xs text-red-500">{errors.street}</p>}
                </div>
                <div>
                  <Label htmlFor="number">Número *</Label>
                  <Input id="number" value={form.number} onChange={(e) => updateForm("number", e.target.value)} placeholder="123" hasError={!!errors.number} />
                  {errors.number && <p className="mt-1 text-xs text-red-500">{errors.number}</p>}
                </div>
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input id="complement" value={form.complement} onChange={(e) => updateForm("complement", e.target.value)} placeholder="Apto, Bloco, Casa" />
                </div>
                <div>
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input id="neighborhood" value={form.neighborhood} onChange={(e) => updateForm("neighborhood", e.target.value)} placeholder="Seu bairro" hasError={!!errors.neighborhood} />
                  {errors.neighborhood && <p className="mt-1 text-xs text-red-500">{errors.neighborhood}</p>}
                </div>
                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input id="city" value={form.city} onChange={(e) => updateForm("city", e.target.value)} placeholder="Sua cidade" hasError={!!errors.city} />
                  {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </div>
                <div>
                  <Label htmlFor="state">Estado (UF) *</Label>
                  <Input id="state" value={form.state} onChange={(e) => updateForm("state", e.target.value)} placeholder="SP" hasError={!!errors.state} />
                  {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
                </div>
                 <div className="p-3 mt-4 border border-orange-200 rounded-md md:col-span-2 bg-orange-50 dark:bg-orange-900/30 dark:border-orange-700/50">
                    <div className="flex items-center gap-2 mb-1 text-orange-800 dark:text-orange-300">
                      <Truck className="flex-shrink-0 w-4 h-4" />
                      <span className="text-sm font-medium">Informações de Entrega Estimada</span>
                    </div>
                    <div className="grid grid-cols-1 text-xs text-orange-700 sm:grid-cols-2 gap-x-4 gap-y-1 dark:text-orange-400">
                      <div className="flex items-center gap-1.5"> <Clock className="w-3.5 h-3.5 flex-shrink-0" /> <span>Entrega em até 5 dias úteis</span></div>
                      <div className="flex items-center gap-1.5"> <PackageIcon className="w-3.5 h-3.5 flex-shrink-0" /> <span>Frete grátis</span></div>
                    </div>
                  </div>
              </div>
            </div>

            {}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700/50">
                <h2 className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                  <CreditCard className="w-5 h-5 mr-3 text-orange-500" />
                  Forma de Pagamento
                </h2>
              </div>
              <div className="p-6">
                <div className="flex p-1 mb-6 space-x-2 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <button type="button" onClick={() => setActivePaymentMethod("credit")} className={paymentMethodButtonStyle("credit")}> <CreditCard className="w-4 h-4 mr-1.5" /> Cartão </button>
                    <button type="button" onClick={() => setActivePaymentMethod("pix")} className={paymentMethodButtonStyle("pix")}> <Smartphone className="w-4 h-4 mr-1.5" /> PIX </button>
                    <button type="button" onClick={() => setActivePaymentMethod("boleto")} className={paymentMethodButtonStyle("boleto")}> <FileText className="w-4 h-4 mr-1.5" /> Boleto </button>
                </div>
                {renderPaymentMethodContent()}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || currentItemCount === 0}
              className="flex items-center justify-center w-full gap-2 px-4 py-4 text-lg font-bold text-white transition-colors duration-150 bg-green-600 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  Processando Pedido...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Confirmar e Pagar
                </>
              )}
            </button>
          </form>

          {}
          <div className="lg:col-span-1">
            <div className="sticky bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50 top-24">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700/50">
                <h2 className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                  <PackageIcon className="w-5 h-5 mr-3 text-orange-500" />
                  Resumo do Pedido
                </h2>
              </div>
              <div className="p-6">
                {currentItemCount > 0 ? (
                  <>
                    <div className="mb-6 space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-gray-700/30 last:border-b-0 last:pb-0">
                          <div className="flex-1 mr-2">
                            <p className="text-sm font-medium leading-tight text-gray-800 dark:text-gray-100 line-clamp-2">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Qtd: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">
                            R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Subtotal ({currentItemCount} itens)</span>
                        <span>R$ {currentTotal.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Frete</span>
                        <span className="font-medium text-green-600 dark:text-green-400">Grátis</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Desconto</span>
                        <span>- R$ 0,00</span>
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between text-base font-bold text-gray-800 dark:text-gray-50">
                          <span>Total</span>
                          <span>R$ {currentTotal.toFixed(2).replace(".", ",")}</span>
                        </div>
                        {currentTotal > 0 && (
                          <p className="text-xs text-green-600 dark:text-green-400 text-right mt-0.5">
                            em até 12x de R$ {(currentTotal / 12).toFixed(2).replace(".", ",")} s/juros
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="py-4 text-sm text-center text-gray-500 dark:text-gray-400">Seu resumo aparecerá aqui quando adicionar itens ao carrinho.</p>
                )}

                 <div className="mt-6 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400"> <ShieldCheck className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> <span>Compra 100% Segura e Protegida</span></div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400"> <Truck className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" /> <span>Entrega Garantida para todo Brasil</span></div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};