import Input from "@Components/InputField/Input";
import { MapPin, Truck } from "lucide-react";
import { ChangeEvent, FC, memo } from "react";
import { RadioGroup, RadioGroupItem } from "../../Components/Radio/Radio";
import { FormDetail, ShippingMethod } from "./Interface";
type FormdataProps = Omit<FormDetail, "cardNumber" | "expiryDate" | "cvv">;

interface ShippingProps {
  formData: FormdataProps;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedShipping: string;
  setSelectedShipping: (value: string) => void;
  shippingMethods: ShippingMethod[];
}

const Shipping: FC<ShippingProps> = ({
  formData,
  handleInputChange,
  selectedShipping,
  setSelectedShipping,
  shippingMethods,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Shipping Information</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName">First Name</label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName">Last Name</label>
          <Input
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label htmlFor="address">Address</label>
          <Input
            id="address"
            name="address"
            label="Address"
            type="text"
            placeholder="123 Main St"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="city">City</label>
          <Input
            id="city"
            name="city"
            label="City"
            type="text"
            placeholder="New York"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="postalCode">Postal Code</label>
          <Input
            id="postalCode"
            name="postalCode"
            label="PostalCode"
            type="number"
            placeholder="10001"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="font-medium flex items-center">
          <Truck className="h-5 w-5 mr-2 text-primary" />
          Shipping Method
        </h3>
        <RadioGroup
          value={selectedShipping}
          onValueChange={setSelectedShipping}
          className="grid grid-cols-2 gap-4"
        >
          {shippingMethods?.map((method) => (
            <label
              key={method.id}
              className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedShipping === method.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <div className="flex-1">
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-muted-foreground">
                  {method.eta}
                </div>
                <div className="font-medium text-primary">
                  ${method.price.toFixed(2)}
                </div>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default memo(Shipping);
