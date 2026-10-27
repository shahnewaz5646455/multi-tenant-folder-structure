// Blueprint D2: display server totals; "Paid" only after server verification.
export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ domain: string; orderNo: string }>;
}): Promise<React.ReactElement> {
  const { orderNo } = await params;
  return <div className="p-6">Order {orderNo}</div>;
}
