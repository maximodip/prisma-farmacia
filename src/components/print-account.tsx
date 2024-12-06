'use client'

import { useState } from 'react'
import { toast } from 'sonner' // Assuming you're using shadcn/ui toast

import { printAccount } from '@/actions/accounts-actions'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/helper'

export function AccountPrint({ accountId }: { accountId: number }) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = async () => {
    setIsPrinting(true)
    try {
      // Fetch account data using server action
      const accountData = await printAccount(accountId)

      // Create a new window for printing
      const printWindow = window.open('', '_blank')

      if (printWindow) {
        // Construct HTML for printing
        printWindow.document.write(`
          <html>
            <head>
              <title>Farmacia Sisa Cuentas</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  max-width: 800px; 
                  margin: 0 auto; 
                  padding: 20px;
                }
                .account-details {
                  border: 1px solid #e0e0e0;
                  padding: 20px;
                  margin: 20px 0;
                }
                .account-header {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  align-items: center;
                  justify-content: space-between;
                  width: 100%;

                  border-bottom: 1px solid #e0e0e0;
                  padding-bottom: 10px;
                  margin-bottom: 10px;
                }
                .items-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                .items-table th, .items-table td {
                  border: 1px solid #e0e0e0;
                  padding: 10px;
                  text-align: left;
                }
                .items-table th {
                  background-color: #f0f0f0;
                }
                .total-section {
                  text-align: right;
                  margin-top: 20px;
                  font-weight: bold;
                }
                #logo {
                  width: 100px;
                  height: 100px;
                }
              </style>
            </head>
            <body>
              <div class="account-details">
                <div class="account-header">
                  <div>
                    <h1>Detalles de cuenta</h1>
                    <p><strong>${accountData.data?.customer.name}</strong></p>
                    <p><strong>Estado:</strong> ${accountData.data?.state === 'paid' ? 'PAGADO' : 'PENDIENTE'}</p>
                    <p><strong>Fecha:</strong> ${formatDate(accountData.data?.createdAt ?? new Date())}</p>
                  </div>
                  <div>
                    <img src="/logo.jpg" id="logo" alt="Farmacia Sisa" />
                  </div>
                </div>

                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${accountData.data?.items
                      .map(
                        (item) => `
                      <tr>
                        <td>${item.product.name}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.priceAtPurchase}</td>
                        <td>$${item.subtotal}</td>
                      </tr>
                    `,
                      )
                      .join('')}
                  </tbody>
                </table>
                
                <div class="total-section">
                  <p>Total: $${accountData.data?.total}</p>
                </div>
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  window.close();
                }
              </script>
            </body>
          </html>
        `)

        printWindow.document.close()
      }

      toast.success('Cuenta impresa correctamente')
    } catch (error) {
      console.error('Error imprimiendo cuenta:', error)
      toast.error('Error al imprimir cuenta')
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <Button disabled={isPrinting} variant="outline" onClick={handlePrint}>
      {isPrinting ? 'Imprimiendo...' : 'Imprimir cuenta'}
    </Button>
  )
}
