import {createAccount} from "@/actions/accounts-actions";
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export function AccountForm({customerId}: {customerId: number}) {
  return (
    <form action={createAccount}>
      <input name="customerId" type="hidden" value={customerId} />
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create New Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="state">Account State</Label>
              <Input id="state" name="state" placeholder="Enter account state (e.g., paid)" />
            </div>
            <div>
              <Label htmlFor="productId">Product IDs (comma-separated)</Label>
              <Input id="productId" name="productId" placeholder="e.g., 1,2,3" />
            </div>
            <div>
              <Label htmlFor="quantity">Quantities (comma-separated)</Label>
              <Input id="quantity" name="quantity" placeholder="e.g., 2,1,4" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Create Account</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
